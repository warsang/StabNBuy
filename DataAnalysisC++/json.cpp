#include "json.h"
#include <algorithm>
#include <fstream>
#include <iostream>

using namespace rapidjson;
using namespace std;

JSon::JSon(string const &path) : mPath(path) {
    ifstream file(mPath);
    if(!file) {
        std::cerr << mPath << " does not be opened" << endl;
        exit(1);
    }
    file.seekg(0, file.end);
    auto length = file.tellg();
    file.seekg(0, file.beg);

    string src(length, 0);
    file.read(&src[0], length);
    mDocument.Parse(src.c_str());
}

void JSon::setKeyWord(const string &keyword) {
    mDocument["SearchRequest"]["Keyword"].SetString(keyword.c_str(),
                                                    mDocument.GetAllocator());
    write();
}

void JSon::getAllProductDetails(vector<string> &Url, vector<string> &Name, vector<string> &Price, vector<string> &ImageUrl) {
    if(mDocument.HasMember("Products") == false) {
        cerr << "output.json does not have products member" << endl;
        exit(1);
    }

    auto &array = mDocument["Products"];

    if(array.IsArray() == false) {
        cerr << "output.json does not have any product" << endl;
        exit(1);
    }

    for(auto i(0u); i < array.Size(); ++i) {
        Url.emplace_back(array[i]["BestOffer"]["ProductURL"].GetString());
        Name.emplace_back(array[i]["Name"].GetString());
        Price.emplace_back(array[i]["BestOffer"]["SalePrice"].GetString());
        ImageUrl.emplace_back(array[i]["MainImageUrl"].GetString());
    }
}

void JSon::write() {
    ofstream file(mPath, ofstream::trunc);
    StringBuffer buffer;
    Writer<StringBuffer> writer(buffer);
    mDocument.Accept(writer);
    file << buffer.GetString();
}
