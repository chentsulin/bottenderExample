module.exports = async (context, match)=> {
    const { userId, displayName } = context.session.user;
  
    if(context.state.orders.some(obj=> obj.userId === userId)){
      await context.sendText(`${displayName} 你已經點過了，可以輸入「取消」再點一次`);
    } else{
      const order = match[1].trim;
      context.setState({
        ...context.state,
        orders: context.state.orders.concat({
            name: displayName,
            userId,
            order,
        }),
      });
      await context.sendText(`我知道了${displayName}點了${order}`);
    }
  };