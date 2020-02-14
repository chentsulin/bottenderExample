module.exports = async (context) => {
    const { displayName, userId } = context.session.user;
    context.setState({
        isOrdering: true,
        host: userId,
        orders: [],
    });
    await context.sendText(`${displayName}開團了！ 快來點喔！`);
};