# LearnFIL

> An interactive learning platform designed to onboard the next wave of Filecoin developers through hands-on, in-browser lessons.

![LearnFIL](https://img.shields.io/badge/Filecoin-Education-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6)

## Overview

LearnFIL breaks down complex Filecoin concepts into bite-sized interactive modules with real coding sandboxes. By making Filecoin accessible to students, builders, and hackathon teams, LearnFIL lowers the barrier to entry and helps grow a knowledgeable, active community.

### Key Features

- **Interactive Code Sandbox** - Write and execute code directly in your browser with instant feedback
- **Structured Curriculum** - Progressive learning path from CIDs to FVM smart contracts
- **Progress Tracking** - Visual indicators and completion tracking for every lesson
- **Hands-On Learning** - Every lesson includes practical coding exercises
- **Beginner Friendly** - No prior Filecoin experience required
- **100% Free** - All content is freely accessible forever

## Curriculum

LearnFIL offers a comprehensive, production-ready curriculum designed to take developers from zero to shipping Filecoin applications. Our hands-on approach ensures every concept is reinforced through interactive coding exercises.

### Module 1: Understanding CIDs
**Master content addressing and cryptographic identifiers**

Dive deep into Content Identifiers (CIDs), the foundation of Filecoin's data architecture. Learn how content addressing enables verifiable, permanent, and tamper-proof data storage.

Topics covered:
- What is a CID and why it matters
- CID versions (v0 vs v1) and their use cases
- Multibase, multicodec, and multihash explained
- Creating and validating CIDs
- Content addressing vs location addressing
- Practical applications in decentralized storage

### Module 2: Storage Deals
**Navigate the complete storage deal lifecycle**

Master the economics and mechanics of storage deals on Filecoin. Understand how to negotiate, monitor, and manage storage agreements with storage providers.

Topics covered:
- Storage deal fundamentals and terminology
- Deal proposal and acceptance flow
- Pricing strategies and cost calculation
- Data transfer and sealing process
- Provider collateral and penalties
- Deal duration and renewal
- Verifying deal status and provider reputation
- Retrieval deals and data access
- Best practices for production storage

### Module 3: FVM Smart Contracts
**Build programmable storage applications**

Unlock the power of the Filecoin Virtual Machine (FVM) to create smart contracts that interact with storage primitives. Deploy EVM-compatible contracts and build data-driven applications.

Topics covered:
- Introduction to FVM architecture
- EVM compatibility and Solidity support
- Deploying your first smart contract
- Interacting with Filecoin built-in actors
- Storage bounties and programmable deals
- Data DAOs and decentralized governance
- Verifiable storage proofs in contracts
- Cross-chain bridges and composability
- Testing and debugging FVM contracts
- Production deployment strategies

### Module 4: IPFS and Filecoin Integration
**Connect content addressing with permanent storage**

Learn how IPFS and Filecoin work together to provide both fast retrieval and long-term archival storage. Build applications that leverage both protocols.

Topics covered:
- IPFS fundamentals and architecture
- Content routing and DHT
- Pinning services and persistence
- Bridging IPFS to Filecoin
- Hybrid storage strategies
- NFT storage and metadata
- Building with web3.storage
- Performance optimization

### Module 5: Retrieval and Data Access
**Efficient data retrieval patterns**

Master the retrieval market and learn strategies for fast, cost-effective data access from the Filecoin network.

Topics covered:
- Retrieval deal mechanics
- Payment channels and micropayments
- Saturn CDN integration
- Caching strategies
- GraphSync protocol
- Retrieval provider selection
- Performance optimization
- Building retrieval applications

### Module 6: Storage Proofs and Verification
**Understand cryptographic guarantees**

Deep dive into the cryptographic proofs that make Filecoin trustless and verifiable. Learn how Proof-of-Replication and Proof-of-Spacetime work.

Topics covered:
- Proof-of-Replication (PoRep) explained
- Proof-of-Spacetime (PoSt) mechanics
- Sealing and verification process
- WindowPoSt and WinningPoSt
- Sector lifecycle management
- Slashing conditions and penalties
- Verifying storage proofs programmatically
- Zero-knowledge proofs in Filecoin

### Module 7: Building Production Applications
**Deploy real-world Filecoin dApps**

Put everything together to build, test, and deploy production-grade applications on Filecoin. Learn best practices, tooling, and deployment strategies.

Topics covered:
- Application architecture patterns
- Client library selection (js-filecoin-client, lotus API)
- Wallet integration and transaction signing
- User experience best practices
- Error handling and retry logic
- Monitoring and observability
- Cost optimization strategies
- Security best practices
- Testing and CI/CD
- Production deployment checklist

### Coming Soon

- **Module 8**: Advanced FVM - Building complex storage markets and data DAOs
- **Module 9**: Filecoin Economics - Token mechanics, mining, and network incentives
- **Module 10**: Storage Provider Operations - Running your own storage node

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Execution**: In-browser JavaScript evaluation


### Project Structure

```
learnfil/
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.tsx  # Marketing landing page
│   │   ├── ModuleCard.tsx   # Module display card
│   │   ├── LessonList.tsx   # Lesson navigation sidebar
│   │   ├── LessonContent.tsx # Lesson content renderer
│   │   └── CodeEditor.tsx   # Interactive code sandbox
│   ├── hooks/               # Custom React hooks
│   │   └── useProgress.ts   # Progress tracking logic
│   ├── lib/                 # Library code
│   │   └── supabase.ts      # Supabase client & types
│   ├── utils/               # Utility functions
│   │   └── codeRunner.ts    # Code validation engine
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── supabase/
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## Database Schema

### Tables

**modules** - Learning modules grouping related lessons
- `id` - Unique identifier
- `title` - Module name
- `description` - Module overview
- `order_index` - Display order
- `icon` - Lucide icon name
- `estimated_minutes` - Completion time

**lessons** - Individual learning units
- `id` - Unique identifier
- `module_id` - Parent module reference
- `title` - Lesson name
- `content` - Markdown content
- `order_index` - Display order
- `starter_code` - Initial sandbox code
- `solution_code` - Reference solution
- `validation_tests` - Test cases (JSONB)

**user_progress** - Student progress tracking
- `id` - Unique identifier
- `user_id` - Student reference
- `lesson_id` - Completed lesson
- `completed` - Completion status
- `code_submission` - Final code
- `completed_at` - Completion timestamp

## Contributing

We welcome contributions from the community! Here's how you can help:

### Adding New Lessons

1. Insert lesson data into the `lessons` table
2. Include starter code and validation tests
3. Write clear, beginner-friendly content
4. Test the interactive coding exercises

### Improving Existing Content

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

### Reporting Issues

Found a bug or have a suggestion? Please open an issue on GitHub with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## Roadmap

- [ ] Add authentication for persistent user accounts
- [ ] Implement certificate generation upon course completion
- [ ] Add more advanced modules (Retrieval, IPFS, Storage Proofs)
- [ ] Create community discussion forums
- [ ] Build mobile-responsive design improvements
- [ ] Add code syntax highlighting
- [ ] Implement lesson bookmarking
- [ ] Create progress analytics dashboard

## License

MIT License - see LICENSE file for details

## Community

- **Discord**: Join our community server
- **Twitter**: Follow [@learnfil](https://x.com/learnfil)
- **GitHub**: [github.com/learnfil](https://github.com/LearnFIL/LearnFIL)

## Acknowledgments

Built with support from the Filecoin community. Special thanks to:
- Protocol Labs for creating Filecoin
- The Supabase team for their excellent platform
- All contributors and early testers

## Support

If you find LearnFIL helpful, please:
- Star the repository on GitHub
- Share it with aspiring Filecoin developers
- Contribute lessons and improvements
- Report bugs and suggest features

---

**Making Filecoin development accessible, one lesson at a time.**
