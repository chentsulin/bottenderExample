const { LineHandler } = require('@bottender/handlers');
const startGroupBuying = require('./action/startGroupBuying');
const endOrder = require('./action/endOrder');
const countOrder = require('./action/countOrder');
const cancelOrder = require('./action/cancelOrder');
const placeOrder = require('./action/placeOrder');

const notgroupBuyingCommandHandler = new LineHandler()
  .onText("開團", startGroupBuying)
  .build();

const groupBuyingCommandHandler = new LineHandler()
  .onText('截止', endOrder)
  .onText('統計', countOrder)
  .onText('取消', cancelOrder)
  .onText(new RegExp("^我也?要(.*)"), placeOrder)
  .build();

module.exports = new LineHandler()
    .on(context => !context.state.isOrdering, notgroupBuyingCommandHandler)
    .on(context => context.state.isOrdering, groupBuyingCommandHandler)
    .build();