---
sidebar_position: 15
---

# Security

## Protect your signing keys

Never expose or share your private keys. If compromised, attackers can initiate sessions on your behalf.

Never share your private keys with anyone (including us), and never expose them in a public code repository or website source code. To further protect your keys, you should consider rotating your private keys regularly.

## Secure API Endpoints

- Avoid open public API endpoints that generate bootstrap tokens.
- Always use an authentication layer when possible.
- If authentication is not feasible, ensure that the target address in the crypto on-ramp flow cannot be locked. Configure `recipientEditMode` to `all-editable` or `only-address-and-tag`.

## Restrict API access

- Implement CORS to limit access to trusted domains.
- Maintain a blacklist of IP addresses and crypto addresses linked to fraudulent activity.

## Respond to threats immediately

If unauthorized entities can generate tokens using your API, take immediate action to secure it. Failure to do so may result in the temporary disabling of your widget until it is deemed secure.
