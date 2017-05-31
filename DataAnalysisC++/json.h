#ifndef JSON_H
#define JSON_H

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
#include <string>
#include <vector>

class JSon
{
public:
    JSon() = delete;
    JSon(std::string const &path);

    void write();

    void setKeyWord(std::string const &keyword);
    void getAllProductDetails(std::vector<std::string> &Url, std::vector<std::string> &Name, std::vector<std::string> &Price, std::vector<std::string> &ImageUrl);

private:
    std::string mPath;
    rapidjson::Document mDocument;
};


#endif // JSON_H
