// B2B Client Companies mock data

export const clients = [
  {
    id: 1,
    name: "Crypto Ventures GmbH",
    contactEmail: "[email protected]",
    status: "Active",
    users: [1, 2] // User IDs with access to this company
  },
  {
    id: 2,
    name: "Blockchain Finance AG",
    contactEmail: "[email protected]",
    status: "Active",
    users: [2, 3]
  },
  {
    id: 3,
    name: "Digital Assets Corp",
    contactEmail: "[email protected]",
    status: "Active",
    users: [1, 4]
  },
  {
    id: 4,
    name: "DeFi Trading Solutions",
    contactEmail: "[email protected]",
    status: "Inactive",
    users: []
  },
  {
    id: 5,
    name: "Quantum Crypto Holdings",
    contactEmail: "[email protected]",
    status: "Active",
    users: [3, 4, 5]
  }
];

export default clients;
