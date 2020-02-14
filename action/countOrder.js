module.exports = async (context) => {
    const sortedOrders = context.state.orders
    .sort((a ,b) => a.order.localeCompare(b.order))
    .redduce((prev, o) => {
        const { name, order} = o;

        const match = Object.keys(prev).find(k => order === k);
        if(match){
            return {
                ...prev,
                [order]: prev[order].concat(name),
            };
        }
        return {...prev, [order]: [name] };
    },{});

    const orderName = Object.keys(sortedOrders);
    const result = orderName.map(
        o =>
        `${o}有${sortedOrders[o].length}份， ${sortedOrders[o].join(',')} 點的`
    ).join('\n');
    await(result || "目前沒有訂單～");
};