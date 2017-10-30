# SubKit GraphQL Directives API

> Demonstrate how Server-Side and Client-Side directives work.

[Live Example](https://subkit-directives.cloud.dropstack.run/graphql)

```graphql
query allItems {
  items @mock(value: [{id: "MikeBild", email: "mike.bild@gmail.com"}, {id: "SubKit"}]) {
    id @toLowerCase
    email
    profile {
      displayName
      description @toFormatString(template: "${displayName} (${aboutMe})", parent: true)
      thumbnailUrl
      aboutMe
      currentLocation
    }
  }
}
```