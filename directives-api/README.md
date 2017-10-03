# SubKit GraphQL Directives API

[Live Example](https://subkit-directives.cloud.dropstack.run/graphql)

```graphql
query allItems {
  items @mock(value: [{id: "MikeBild", email: "mike.bild@gmail.com"}, {id: "SubKit"}]) {
    id @toLowerCase
    email
    profile @fetchJSON(url: "https://de.gravatar.com/${id}.json", jsonQuery: "entry[0]", timeout: 1000) {
      displayName
      description @toFormatString(template: "${displayName} (${aboutMe})", parent: true)
      thumbnailUrl
      aboutMe
      currentLocation
    }
  }
}
```