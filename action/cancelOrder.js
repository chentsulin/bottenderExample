module.exports = async (context) =>{
    const { displayName, userId } = context.session.user;
    if(context.state.orders.some(obj => obj.userId === userId)){
        context.setState({
            ...context.state,
            orders: context.state.orders.filter(obj => obj.userId !== userId),
        });
        await context.sendText(`${displayName}，我已經幫你取消訂餐囉～`);
    } else {
        await context.sendText(`${displayName}，請打我要或我也要加上訂購內容`);
    }
};