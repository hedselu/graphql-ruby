var createActionCableHandler = require("./createActionCableHandler")
var createPusherHandler = require("./createPusherHandler")
/**
 * Transport-agnostic wrapper for Relay Modern subscription handlers.
 * @example Add ActionCable subscriptions
 *   var subscriptionHandler = createHandler({
 *     cable: cable,
 *     operations: OperationStoreClient,
 *   })
 *   var network = Network.create(fetchQuery, subscriptionHandler)
 * @param {ActionCable.Consumer} options.cable - A consumer from `.createConsumer`
 * @param {Pusher} options.pusher - A Pusher client
 * @param {OperationStoreClient} options.operations - A generated `OperationStoreClient` for graphql-pro's OperationStore
 * @return {Function} A handler for a Relay Modern network
*/
function createHandler(options) {
  if (!options) {
    options = {}
  }
  var handler
  if (options.cable) {
    handler = createActionCableHandler(options.cable, options.operations)
  } else if (options.pusher) {
    handler = createPusherHandler(options)
  }
  return handler
}

module.exports = createHandler
