import {convertToMongooseSchema} from "../src/";
import {Schema} from "mongoose";

describe('it sums two numbers', () => {
    const jsonSchema = {
        "title": "Generated schema for Root",
        "description": "Generated schema for Root",
        "type": "object",
        "properties": {
            "user": {
                "$ref": "users"
            },
            "id": {
                "type": "number"
            },
            "title": {
                "type": "string",
                "minLength": 1,
                "maxLength": 10,
            },
            "completed": {
                "type": "boolean"
            },
            "publisher": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "pattern": /^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$/
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
            "user",
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
        user: {type: Schema.Types.ObjectId, ref: 'users', required: true},
        id: {type: Number, required: true},
        title: {type: String, required: true, minLength: 1, maxLength: 10},
        completed: {type: Boolean, required: true},
        publisher: {
            name: {type: String, required: true, match: /^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$/},
            id: {type: Number, required: true}
        },
        managers: [{
            name: {type: String, required: true},
            id: {type: Number, required: true}
        }],
        tags: {type: [String], required: true}
    }

    it('must convert jsonschema to mongoose schema', () => {
        // @ts-ignore
        const result = convertToMongooseSchema(jsonSchema);

        expect(result).toEqual(mongooseSchema);
    });
});