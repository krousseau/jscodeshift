export default function transformer(file, api) {
  const j = api.jscodeshift;
  
  return j(file.source)
    // Find stuff that looks like ::this.xyz
    .find(j.BindExpression, {callee: {object: j.ThisExpression}})
    // Ensure that .bind() is being called with only one argument, and that argument is "this".
    //.filter(p => p.value.arguments.length == 1 && p.value.arguments[0].type == "ThisExpression")
    // We can now replace it with ::this.xyz
  	.replaceWith(p => {
    	console.log(p.value.callee);
    	return j.callExpression(p.value.callee, 
                                [j.thisExpression(), p.value.callee.property]);
  	})
    .toSource();
}
