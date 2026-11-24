# @preprocess/auth

Better Auth setup and our extensions: organizations, fixed roles (Owner, Admin,
Member), API keys, SSO and SCIM. It lands in build step 1 and is private until
it has a public API.

Rules it keeps:

- Each product supplies its own database and schema. This package never owns a
  product's tables.
- Preprocess and Paved share no identity. Each product has its own users and
  organizations, so nothing here assumes a user or organization exists in more
  than one product.
- Permissions and audit events live in the product's Postgres.
