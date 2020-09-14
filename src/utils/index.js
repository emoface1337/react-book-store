// const compose = (...funcs) => (comp) => {
//     return funcs.reduceRight(
//         (wrapped, f) => f(wrapped), comp)
// }

const compose = (...funcs) => x => funcs.reduceRight((value,func) => func(value), x)

export default compose