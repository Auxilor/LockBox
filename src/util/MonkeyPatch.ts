import path from "path";
import moduleAlias from "module-alias";
const d = path.resolve(`${__dirname}/../../`);

moduleAlias.addAliases({
	"@root": d,
	"@util": `${d}/src/util`,
	"@Lockbox": `${d}/src/main`,
	"@models": `${d}/src/models`,
});