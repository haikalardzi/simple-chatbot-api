//GET /api/chatbot
export const MakeSession = {
    type: 'object',
    properties: {
        message: {
            type: 'object',
            properties: {
                message: { type: 'string', example: "Session created successfully with id: 1" },
                id: { type: 'number', example: 1 }
            }
        },
        success: { type: 'boolean', example: true }
    }
}


//GET /api/chatbot/{id}
export const GetChat = {
    type: 'object',
    properties: {
        message: {
            type: 'object',
            properties: {
                history: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            question: { type: 'string', example: "What topping would you like on your Pizza?" },
                            response: { type: 'string', example: 'Pepperoni' }
                        }
                    }
                },
                question: { type: 'string', example: "What topping would you like on your Pizza?" },
                options: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            response: { type: 'string', example: 'Pepperoni' },
                            next_question_id: { type: 'number', example: 2 }
                        }
                    }
                }
            }
        },
        success: { type: 'boolean', example: true }
    }
}

//PUT /api/chatbot-api/{id}
export const NextQuestionResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'object',
      properties: {
        question: { type: 'string', example: "What topping would you like on your Pizza?" },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              response: { type: 'string', example: 'Pepperoni' },
              next_question_id: { type: 'number', example: 2 }
            }
          }
        }
      }
    },
    success: { type: 'boolean', example: true }
  }
}

export const SelectOptionError = {
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Chat session not found or not selected a valid option' },
    success: { type: 'boolean', example: false }
  }
}