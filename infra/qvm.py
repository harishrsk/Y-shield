import requests
import json
import os

# Configuration: Repositories to monitor
REPOS = {
    "openssl": "openssl/openssl",
    "liboqs": "open-quantum-safe/liboqs",
    "oqs-provider": "open-quantum-safe/oqs-provider"
}

VERSION_FILE = "gateway/versions.json"

def get_latest_tag(repo):
    """Fetch the latest release tag from GitHub API."""
    url = f"https://api.github.com/repos/{repo}/releases/latest"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()["tag_name"].replace("v", "").replace("openssl-", "")
    except Exception as e:
        print(f"Error fetching {repo}: {e}")
        return None

def main():
    print("--- Quantum Version Monitor (QVM) ---")
    
    # Load current versions
    if os.path.exists(VERSION_FILE):
        with open(VERSION_FILE, 'r') as f:
            current_versions = json.load(f)
    else:
        current_versions = {}

    updates_found = False
    new_versions = {}

    for name, repo in REPOS.items():
        latest = get_latest_tag(repo)
        current = current_versions.get(name, "Unknown")
        
        if latest and latest != current:
            print(f"[UPDATE] {name}: {current} -> {latest}")
            updates_found = True
            new_versions[name] = latest
        else:
            print(f"[OK] {name}: {current} is up to date.")
            new_versions[name] = current

    if updates_found:
        print("\nNew quantum technology detected! Updating versions.json...")
        with open(VERSION_FILE, 'w') as f:
            json.dump(new_versions, f, indent=4)
        # In a CI environment, this would trigger a 'docker build'
    else:
        print("\nSystem is quantum-ready and up to date.")

if __name__ == "__main__":
    main()
