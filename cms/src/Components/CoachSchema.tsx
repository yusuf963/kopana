import { buildProperty, buildSchema, EntityReference } from "@camberi/firecms"

const locales = {
    "en-US": "English (United States)",
    "es-ES": "Spanish (Spain)",
    "de-DE": "German"
};

//declare type of object, satisfy typescript
type Coach = {
    first_name: string;
    last_name: string;
    status: string;
    nationality: string;
    age: number
    published: boolean;
    primary_foot: string;
    relatedClub: string;
    Previous_relatedClub: string[];
    main_image: string;
    tags: string[];
    publisher: {
        first_name: string;
        last_name: string;
    },
    expire_on: Date
}

export const coachSchema = buildSchema<Coach>({
    name: "Coach",
    properties: {
        first_name: {
            title: "First Name",
            dataType: "string",
            validation: {
                required: true
            }
        },
        last_name: {
            title: "last Name",
            dataType: "string",
            validation: {
                required: true
            }
        },
        status: {
            title: "Status",
            dataType: "string",
        },
        nationality: {
            title: "Nationality",
            dataType: "string"
        },
        age: {
            title: "Age",
            dataType: "number",
            validation: {
                min: 14,
                max: 100,
                requiredMessage: " age must be over than 14 years and less than 100 years"
            }
        },
        published: ({ values }) =>
            buildProperty({
                title: "Published",
                dataType: "boolean",
                disabled: (
                    values.status === "public" ? false
                        : {
                            clearOnDisabled: true,
                            disabledMessage: " Status must be public in order to enable this the published flag"
                        }
                )
            }),
        primary_foot: {
            title: "Primary Foot",
            dataType: "string"
        },
        main_image: buildProperty({
            title: "Image",
            dataType: "string",
            config: {
                storageMeta: {
                    mediaType: "image",
                    storagePath: "image",
                    acceptedFiles: ["image/*"]
                }
            }
        }),
        relatedClub: {
            title: "Related Club",
            dataType: "string"
        },
        Previous_relatedClub: {
            title: "Pervious Club Related",
            dataType: 'array',
            of: {
                dataType: "string"
            }
        },
        tags: {
            title: " Tag",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        publisher: {
            title: "Publisher",
            dataType: "map",
            properties: {
                first_name: {
                    title: "First Name",
                    dataType: "string"
                },
                last_name: {
                    title: "LAst Name",
                    dataType: "string"
                }
            }
        },
        expire_on: {
            title: "Expire on",
            dataType: "timestamp"
        }
    }
})