import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native';
import { Shield, Zap, Terminal, FileText, Download, UserCheck, AlertCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const SalesArchitectAgent = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'agent', content: 'Sovereign Intelligence Architect initialized. Ready for technical diagnostic.' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState(['> System Ready', '> Awaiting Handshake...']);
  const [showAssessment, setShowAssessment] = useState(false);

  const steps = [
    { q: "Step 1/4: What is your primary encryption algorithm for data-at-rest? (e.g., AES-256, RSA-2048)", key: 'encryption' },
    { q: "Step 2/4: What is the estimated shelf-life of your most sensitive data? (5yr, 10yr, 30yr+)", key: 'shelfLife' },
    { q: "Step 3/4: Specify your industry vertical for regulatory mapping.", key: 'industry' },
    { q: "Step 4/4: Which compliance mandate is your primary focus? (NQM, GDPR, DPDP)", key: 'compliance' }
  ];

  const handleSend = () => {
    if (!input) return;
    
    const newMessages = [...messages, { id: Date.now(), role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    if (step < steps.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', content: steps[step].q }]);
        setStep(step + 1);
        simulateTerminal(`Processing ${steps[step].key}...`);
      }, 800);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', content: 'Diagnostic complete. Generating Quantum Risk Assessment...' }]);
        setShowAssessment(true);
        simulateHandshake();
      }, 1000);
    }
  };

  const simulateTerminal = (msg: string) => {
    setTerminalOutput(prev => [...prev.slice(-10), `> ${msg}`]);
  };

  const simulateHandshake = () => {
    const frames = [
      "Starting ML-KEM-768 Handshake...",
      "Generating Kyber.Encapsulate(pk)...",
      "Shared Secret Derived: 0x4F...E1",
      "Mathematical Proof: SECURE",
      "Classical RSA: VULNERABLE",
      "Handshake Completed in 0.42ms"
    ];
    frames.forEach((f, i) => {
      setTimeout(() => simulateTerminal(f), i * 300);
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Shield color="#00A3FF" size={24} />
        <Text style={styles.headerText}>SALES ARCHITECT AGENT</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>SOVEREIGN</Text></View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.chatArea}>
        {messages.map(m => (
          <View key={m.id} style={[styles.message, m.role === 'user' ? styles.userMessage : styles.agentMessage]}>
            <Text style={styles.messageText}>{m.content}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Sandbox Terminal */}
      <View style={styles.terminal}>
        <View style={styles.terminalHeader}>
          <Terminal color="#00FFCC" size={14} />
          <Text style={styles.terminalHeaderText}>SANDBOX TERMINAL - PQC_DEMO_V1</Text>
        </View>
        <ScrollView style={styles.terminalBody}>
          {terminalOutput.map((line, i) => (
            <Text key={i} style={styles.terminalText}>{line}</Text>
          ))}
        </ScrollView>
      </View>

      {/* Input Area / Assessment */}
      {showAssessment ? (
        <View style={styles.assessmentPanel}>
          <View style={styles.assessmentHeader}>
            <FileText color="#BA00FF" size={20} />
            <Text style={styles.assessmentTitle}>Quantum Risk Assessment Ready</Text>
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <Download color="#FFF" size={18} />
            <Text style={styles.downloadButtonText}>DOWNLOAD REPORT (PDF)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <UserCheck color="#FFF" size={18} />
            <Text style={styles.callButtonText}>TALK TO HUMAN ARCHITECT</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your response..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Zap color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#222',
    height: 700,
    width: Platform.OS === 'web' ? 450 : width - 32,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  headerText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: '#00A3FF22',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#00A3FF44',
  },
  badgeText: {
    color: '#00A3FF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  chatArea: {
    flex: 1,
    marginBottom: 16,
  },
  message: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    maxWidth: '85%',
  },
  agentMessage: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#00A3FF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  messageText: {
    color: '#EEE',
    fontSize: 13,
    lineHeight: 18,
  },
  terminal: {
    backgroundColor: '#000',
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00FFCC22',
    marginBottom: 16,
    overflow: 'hidden',
  },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00FFCC11',
    padding: 6,
    gap: 8,
  },
  terminalHeaderText: {
    color: '#00FFCC',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  terminalBody: {
    padding: 8,
  },
  terminalText: {
    color: '#00FFCC',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 2,
  },
  inputArea: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  sendButton: {
    backgroundColor: '#00A3FF',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assessmentPanel: {
    gap: 12,
    padding: 16,
    backgroundColor: '#111',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BA00FF44',
  },
  assessmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  assessmentTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#BA00FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  downloadButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  callButton: {
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
});
