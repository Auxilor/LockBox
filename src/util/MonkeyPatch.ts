import sauce from 'source-map-support';
import path from "path";
import moduleAlias from "module-alias";
const d = path.resolve(`${__dirname}/../../`);

sauce.install({ hookRequire: true });
moduleAlias.addAliases({
	"@root": d,
	"@util": `${d}/src/util`,
	"@Lockbox": `${d}/src/main`,
});