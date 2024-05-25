import {convertToMongooseSchema} from "../src/";

describe('it sums two numbers', () => {
    const jsonSchema = {
        "title": "Generated schema for Root",
        "description": "Generated schema for Root",
        "type": "object",
        "properties": {
            "userId": {
                "type": "number"
            },
            "id": {
                "type": "number"
            },
            "title": {
                "type": "string"
            },
            "completed": {
                "type": "boolean"
            },
            "publisher": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "id": {
                        "type": "number"
                    }
                },
                "required": [
                    "name",
                    "id"
                ]
            },
            "managers": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "id": {
                            "type": "number"
                        }
                    },
                    "required": [
                        "name",
                        "id"
                    ]
                }
            },
            "tags": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            }
        },
        "required": [
            "userId",
            "id",
            "title",
            "completed",
            "publisher",
            "managers",
            "tags"
        ],
        "additionalProperties": false
    }

    const mongooseSchema = {
        userId: { type: Number, required: true },
        id: { type: Number, required: true },
        title: { type: String, required: true },
        completed: { type: Boolean, required: true },
        publisher: {
            name: { type: String, required: true },
            id: { type: Number, required: true }
        },
        managers: [{
            name: { type: String, required: true },
            id: { type: Number, required: true }
        }],
        tags: { type: [String], required: true }
    }

    it('must converts jsonschema to mongoose schema', () => {
        // @ts-ignore
        const result = convertToMongooseSchema(jsonSchema);

        expect(result).toEqual(mongooseSchema);
    });
});