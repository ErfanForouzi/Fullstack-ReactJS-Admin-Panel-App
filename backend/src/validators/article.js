export const createArticleSchema = {
    body:{
        type: 'object',
        required:true,
        properties: {
            title: {
                type: 'string',
                required: true,
                minLength:5,
                maxLength:255,
            },
            text: {
                type: 'string',
                required: true,
                minLength:5,
                maxLength:255,
            }
        }
    }
}
export const updateArticleSchema = {
    body:{
        type: 'object',
        required:true,
        properties: {
            title: {
                type: 'string',
                required: true,
                minLength:5,
                maxLength:255,
            },
            text: {
                type: 'string',
                required: true,
                minLength:5,
                maxLength:255,
            }
        }
    }
}