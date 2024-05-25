# jsonschema-to-mongoose-schema
Utility which converts jsonschema to mongoose schema.

## Development
Run test
```shell
npm run test
```

## Install
```shell
npm i @hemanthsr/jsonschema-to-mongoose-schema
```

### Usage
```typescript
import {convertToMongooseSchema} from "@hemanthsr/jsonschema-to-mongoose-schema"

const jsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "User",
    "description": "A user schema with id and name",
    "type": "object",
    "properties": {
        "id": {
            "type": "number",
            "description": "The unique identifier for a user"
        },
        "name": {
            "type": "string",
            "description": "The name of the user"
        }
    },
    "required": ["id", "name"],
    "additionalProperties": false
}

const mSchema = convertToMongooseSchema(jsonSchema)
console.log(mSchema)
/*
{
  id: { type: Number, required: true },
  name: { type: String, required: true }
}
 */
const UserSchema = new mongoose.Schema(mSchema)
```

## Contributions
You are welcome to contribute to this project if you see something missing. Follow https://kbroman.org/github_tutorial/pages/fork.html for step-by-step guide.