#ifndef CDISCOUNTAPI_H
#define CDISCOUNTAPI_H

#include "json.h"

class CDiscountAPI {
public:
    CDiscountAPI(std::string const &path);
    virtual JSon getResult() = 0;

    virtual ~CDiscountAPI() = default;

private:
    std::string const mPath;
};

class CDiscountAPICurlSystem : public CDiscountAPI {
public:
    CDiscountAPICurlSystem(std::string const &path);
    JSon getResult();
};

#endif // CDISCOUNTAPI_H
