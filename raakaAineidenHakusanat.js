
// liha, kana ja kala, maitotuoteet ja muna, kasvikset, juomat, hedelmät, viljatuotteet
const raakaAineidenHakusanalistat = {
    "meat": ["FISH", "FISHPROD", "SHELLFIS", "INSECT", "BEEF", "PORK", "LAMM", "POULTRY", "SAUSAGE", "SAUSCUTS", "MEATCUTS", "MEATPROD", "GAME", "OFFAL", "EGG", "EGGOTH"],
    "fruit": ["FRUITTOT", "APPLE", "CITRUS", "FRUITOTH", "BERRY"],
    "vegetable": ["VEGTOT", "VEGLEAF", "VEGFRU", "CABBAGE", "VEGONI", "ROOT", "MUSHRO", "LEGUTOT", "PEABEAN", "NUTSEED", "POTATOT", "POTATO"],
    "dairy": ["MILKTOT", "CREAM", "ICECREAM", "MILKFF", "MILKLF", "MILKHF", "MILKINGR", "SOURMILK", "YOGHURHI", "YOGHURLO", "MILKCURL", "CURD", "SOUCREAM", "CHEECUHI", "CHEECULO", "CHEEUNHI", "CHEEUNLO", "CHEEPRHI", "CHEEPRLO", "BUTTER", "BUTTHIGH", "BUTTLOW"],
    "grain": ["CERTOT", "WHEAT", "RYE", "OAT", "BARLEY", "RICE", "CEROTH"],
    "dish": ["DISH"],
    "drink": ["VEGJUICE", "LEGULIQ", "OATLIQ", "CEROTLIQ", "MILKFF", "MILKLF", "MILKHF", "SOURMILK", "COFFEE", "TEA", "WATER", "SDRINK", "DRINKART", "DRINKCO", "DRSPORT", "DRINKOTH"],
    "sweet": ["FRUITCAN", "ICECREAM", "SDRINK", "SUGARSYR", "SWEET", "CHOCOLAT", "JAM"],
    "alcohol": ["ALCTOT", "BEER", "CIDER", "WINE", "SPIRIT", "ALCOTH"]
}
module.exports = { raakaAineidenHakusanalistat }