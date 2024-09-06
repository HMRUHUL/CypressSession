// const pim = "span:contain('PIM')"
const pim  = "ul li a span:contains('PIM')"
const dir  = "ul li a span:contains('Directory')"

class PIMPageObj{
    getClick(){
        return pim;
    }
    getClickDir(){
        return dir;
    }
}
export default PIMPageObj