// import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';
// import { getMainDefinition } from '@apollo/client/utilities';

// // GraphQL API Endpoints
// const HTTP_URI = 'http://localhost:5000/graphql';
// const WS_URI = 'ws://localhost:5000/graphql';

// // ✅ HTTP Connection (Queries & Mutations)
// const httpLink = new HttpLink({
//   uri: HTTP_URI,
//   headers: {
//     authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
//   },
// });

// // ✅ WebSocket Connection (Subscriptions) with Reconnection Logic
// const wsClient = createClient({
//   url: WS_URI,
//   connectionParams: async () => ({
//     authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
//   }),
//   shouldRetry: () => true, // Always retry connection if it fails
//   retryAttempts: Infinity, // Infinite retry attempts for reconnection
//   on: {
//     connected: () => console.log('✅ WebSocket Connected!'),
//     closed: (event) => {
//       console.warn(`❌ WebSocket Closed: ${event.code}`, event.reason);
//       attemptReconnect();
//     },
//     error: (err) => console.error('❌ WebSocket Error:', err),
//   },
// });

// const wsLink = new GraphQLWsLink(wsClient);

// // ✅ Function to Handle WebSocket Reconnection
// function attemptReconnect() {
//   console.log('🔄 Attempting WebSocket Reconnection...');
//   setTimeout(() => {
//     wsClient.dispose();
//     wsClient.connect();
//   }, 3000); // Reconnect after 3 seconds
// }

// // ✅ Split Link: Use HTTP for Queries/Mutations, WebSocket for Subscriptions
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//   },
//   wsLink,  // Subscriptions → WebSocket
//   httpLink  // Queries & Mutations → HTTP
// );

// // ✅ Apollo Client Instance
// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
//   connectToDevTools: true, // Enable Apollo DevTools
// });

// export default client;

import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// GraphQL API Endpoints
const HTTP_URI = 'http://localhost:5000/graphql';
const WS_URI = 'ws://localhost:5000/graphql';

// ✅ Function to Retrieve Auth Headers Dynamically
const getAuthHeaders = () => ({
  authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
});

// ✅ HTTP Connection (Queries & Mutations)
const httpLink = new HttpLink({
  uri: HTTP_URI,
  headers: getAuthHeaders(), // Dynamic headers
});

// ✅ WebSocket Connection (Subscriptions) with Auto-Reconnection
const wsClient = createClient({
  url: WS_URI,
  connectionParams: () => ({
    authorization: getAuthHeaders().authorization,
  }),
  shouldRetry: () => true, // Automatically retry on failure
  retryAttempts: Infinity, // Infinite retries
  on: {
    connected: () => console.log('✅ WebSocket Connected!'),
    closed: (event) => console.warn(`❌ WebSocket Closed: ${event.code}`, event.reason),
    error: (err) => console.error('❌ WebSocket Error:', err),
  },
});

const wsLink = new GraphQLWsLink(wsClient);

// ✅ Split Link: HTTP for Queries/Mutations, WebSocket for Subscriptions
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,  // Subscriptions → WebSocket
  httpLink  // Queries & Mutations → HTTP
);

// ✅ Apollo Client Instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true, // Enable Apollo DevTools
});

export default client;
