#include "analysekeyword.h"
#include <fstream>
#include <unordered_map>
#include <set>
#include <algorithm>
#include <iostream>

using namespace std;

std::string getPerfectForm(std::string const &str) {
    string result;

    int i = 0;
    for(char a : str) {

        a = tolower(a);
        /*
        if(!(i == str.size()-1 && (a == '.' || a == ',')))
                result += a;

        ++i;
        if(a >= 'a' && a <= 'z')
            result += a;

        else if(a == '-' && a == '&' && a == '_')
            result += a;
        else
            result += ' ';*/
        if((a >= 'a' && a <= 'z') || a == '+' || (a >= '0' && a <= '9')
        || a =='-' || a =='_' || a == '"' || a =='\''
        || (i+1 == str.length() && (a == '.' || a == ',')))
            result += a;
        ++i;

    }
    //if(result[result.length()-1] == '.' || result[result.length()-1] == ',')
      //  result.erase(result.end()-1);


    return result;
}

AnalyseKeyWord::AnalyseKeyWord(string const &pathDico, size_t maxKeyWords) :
    mMaxKeyWords(maxKeyWords) {
    ifstream file(pathDico);

    if(!file) {
        cerr << pathDico << ": Dico is not opened" << endl;
        exit(1);
    }

    string line;
    while(getline(file, line))
        mDico.emplace_back(getPerfectForm(line));

    for(auto &str : mDico)
        cout << str << endl;
}

AnalyseKeyWordByNumber::AnalyseKeyWordByNumber(const string &pathDico, size_t maxKeyWords) :
    AnalyseKeyWord(pathDico, maxKeyWords) {

}

void AnalyseKeyWordByNumber::getKeyWords(const string &path, vector<string> &best_keywords) {
    ifstream fin (path);

    if(!fin) {
        cerr << path << ": Data is not opened" << endl;
        exit(1);
    }


    string s = "";

    unordered_map <string, int> m;

    while(!fin.eof()){
        fin >> s;
        s = getPerfectForm(s);
        if(find(mDico.begin(),mDico.end(),s) != mDico.end())
            --m[s];
    }

    std::set<pair<int, string>> keywords;

    for(auto &p : m)
        keywords.insert(make_pair(p.second, p.first));
/*
    for(auto it = keywords.begin(); it != keywords.end(); ++it)
        cout << it->first << " " << it->second << endl;*/

    auto it = keywords.begin();

    for(auto i(0u); i < mMaxKeyWords && it != keywords.end(); ++i, ++it) {
        best_keywords.emplace_back(it->second);
    }
}


