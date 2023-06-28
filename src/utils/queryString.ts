export enum GRAPHQL_QUERY {
    PR_PARA_ART_GET = `query pr_para_art_get($txId: String $_id: ObjectID $tokenId: Int){
      pr_para_art_get(txId: $txId _id: $_id tokenId: $tokenId) {
      errorCode
      errorMessage
      data {
          _id
          ownerName
          structure
          image
          runeCount
          submittedAt
          paid
          tokenId
          template
          reason
          name
          refusedAt
          registeredAt
        }
      }
  }`,
  AUTH_VERIFY_TOKEN = `query auth_verify_token($address: String){
    auth_verify_token (address: $address){
      resultCode
      resultMessage
    }
  }`
}
