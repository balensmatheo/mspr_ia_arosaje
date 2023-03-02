export type AmplifyDependentResourcesAttributes = {
  "api": {
    "arosaje": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "arosaje": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "GoogleWebClient": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "AdminsGroupRole": "string",
      "BotanistesGroupRole": "string",
      "UsersGroupRole": "string"
    }
  },
  "function": {
    "RekognitionIndexFacesTrigger462dfc4d": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "RekognitionIndexFacesTriggercb853a61": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "predictions": {
    "identifyEntities08568112": {
      "celebrityDetectionEnabled": "string",
      "collectionId": "string",
      "maxEntities": "string",
      "region": "string"
    },
    "identifyLabels508dd13b": {
      "region": "string",
      "type": "string"
    }
  },
  "storage": {
    "s3arosajestorage5b65df8d": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}