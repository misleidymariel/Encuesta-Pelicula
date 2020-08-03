
class SqlUtil {
    /**
     * 
     * @param {Array<Conditional>} args is a array of Conditional object 
     * @param {string} operator operator to be used in all conditionals 
     */
    static buildWhereClause(args, operator) {

        var clause = [] //
        args.forEach(arg => {
            if(arg.value) {
                var cond = arg.columnName + ' ' + arg.operator + ' ' + arg.value;
                console.log(cond);
                clause.push(cond);
            }
        });
        console.log("clause size", clause.length);
        if (clause.length > 0) {
            return 'WHERE ' + clause.join(operator)
        }

        return ''
    }
}


class Conditional {
    
    constructor(columnName, value, operator) {
        this.columnName = columnName;
        this.value = value;
        this.operator = operator;
    }
}

module.exports.Conditional = Conditional;
module.exports.SqlUtil = SqlUtil;