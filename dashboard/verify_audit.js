const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const events = await prisma.pqcEvent.findMany({
    orderBy: { timestamp: 'desc' },
    take: 5
  });
  
  console.log("--- Latest Live Audit Events ---");
  events.forEach(event => {
    console.log(`[${event.timestamp.toISOString()}] ${event.eventType} | Target: ${event.target} | Alg: ${event.algorithm} | Status: ${event.status}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
