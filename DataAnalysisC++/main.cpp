#include <iostream>
#include <set>
#include "json.h"
#include "cdiscountapi.h"
#include <fstream>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include "analysekeyword.h"

using namespace std;

int main()
{
    ofstream links("../tmp/links", ofstream::trunc);

    if(!links) {
        cerr << "Impossible to create links, check if tmp is created" << endl;
        return 1;
    }

    JSon json("../data/input.json");
    vector<string> keyWords;
    AnalyseKeyWordByNumber("../data/dico", 5).getKeyWords("../tmp/data", keyWords);

    /*for(auto &keyWord : keyWords) {
        json.setKeyWord(keyWord);

        vector<string> Url;
        vector<string> Name;
        vector<string> Price;
        vector<string> ImageUrl;


        JSon result = CDiscountAPICurlSystem("../data/input.json").getResult();

        result.getAllProductDetails(Url, Name, Price, ImageUrl);

        string jsonString;

        jsonString.append("[");
        for(int i = 0; i < Url.size(); ++i){

            jsonString.append("{\"name\":\"" + Name[i] + "\",\"price\":\"" + Price[i] + "\",\"url\":\"" + Url[i] + "\",\"image\":\"" + ImageUrl[i] + "\"}");
            jsonString.append((i < Url.size()-1) ? "," : "");
        }
        jsonString.append("]");

        links << jsonString << endl;

    }*/

    string keyWords_concat = "";
    for(auto &keyWord : keyWords) {
        keyWords_concat.append(keyWord + " ");
    }

    json.setKeyWord(keyWords_concat);

    vector<string> Url;
    vector<string> Name;
    vector<string> Price;
    vector<string> ImageUrl;


    JSon result = CDiscountAPICurlSystem("../data/input.json").getResult();

    result.getAllProductDetails(Url, Name, Price, ImageUrl);

    string jsonString;

    jsonString.append("[");
    for(int i = 0; i < Url.size(); ++i){

        jsonString.append("{\"name\":\"" + Name[i] + "\",\"price\":\"" + Price[i] + "\",\"url\":\"" + Url[i] + "\",\"image\":\"" + ImageUrl[i] + "\"}");
        jsonString.append((i < Url.size()-1) ? "," : "");
    }
    jsonString.append("]");

    links << jsonString << endl;

    return 0;
}
