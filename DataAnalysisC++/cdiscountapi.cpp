#include "cdiscountapi.h"

CDiscountAPI::CDiscountAPI(std::string const &path) :
    mPath(path) {
}

CDiscountAPICurlSystem::CDiscountAPICurlSystem(const std::string &path) :
    CDiscountAPI(path) {
    system(("curl -s -o ../tmp/output.json -H \"Content-Type: application/json\" -X POST -d @" + path +  " https://api.cdiscount.com/OpenApi/json/Search > /dev/null").c_str());
}

JSon CDiscountAPICurlSystem::getResult() {
    return JSon("../tmp/output.json");
}
