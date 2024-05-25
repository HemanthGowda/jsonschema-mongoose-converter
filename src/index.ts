import {JSONSchemaType} from "ajv";
import {SchemaDefinition} from "mongoose";

function convertStringField(key: string, value: any, schema: SchemaDefinition, isArray: boolean = false) {
    let def: any = {
        "type": isArray ? [String] : String,
        required: (schema.required as String[]).includes(key)
    };
    if (value.minLength) {
        def["minLength"] = value.minLength;
    }
    if (value.maxLength) {
        def["maxLength"] = value.maxLength;
    }
    if (value.pattern) {
        def["match"] = value.pattern;
    }

    return def
}

function convertNumberField(key: string, value: any, schema: JSONSchemaType<any>, isArray: boolean = false) {
    return {
        "type": isArray ? [Number] : Number,
        required: (schema.required as String[]).includes(key)
    };
}

function convertBooleanField(key: string, value: any, schema: JSONSchemaType<any>, isArray: boolean = false) {
    return {
        "type": isArray ? [Boolean] : Boolean,
        required: (schema.required as String[]).includes(key)
    };
}

function convertArrayField(key: string, value: any, schema: JSONSchemaType<any>) {
    switch (value.items.type) {
        case "string":
            return convertStringField(key, value, schema, true)
        case "number":
            return convertNumberField(key, value, schema, true)
        case "boolean":
            return convertBooleanField(key, value, schema, true)
        case "object":
            return [convertToMongooseSchema(value.items)]
        default:
            throw new Error(`Unknown type "${value.type}"`)
    }
}

const convertToMongooseSchema = (schema: JSONSchemaType<any>): SchemaDefinition => {
    const mSchema: SchemaDefinition = {};
    for (const [key, value] of Object.entries(schema.properties as JSONSchemaType<any>)) {
        switch (value.type) {
            case "string":
                mSchema[key] = convertStringField(key, value, schema)
                break;
            case "number":
                mSchema[key] = convertNumberField(key, value, schema)
                break;
            case "boolean":
                mSchema[key] = convertBooleanField(key, value, schema)
                break;
            case "object":
                mSchema[key] = convertToMongooseSchema(value)
                break;
            case "array":
                mSchema[key] = convertArrayField(key, value, schema)
                break;
            default:
                throw new Error(`Unknown type "${value.type}"`)

        }
    }

    return mSchema;
}

export {convertToMongooseSchema}