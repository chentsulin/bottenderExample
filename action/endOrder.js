module.exports = async (context) => {
    const { userId, displayName } = context.session.user;
    if(context.state.host === userId){
        await context.sendText(`截止了！`);
        context.resetState();
    } else {
        await context.sendText(`${displayName}不是你開的團喔！`);
    }
};