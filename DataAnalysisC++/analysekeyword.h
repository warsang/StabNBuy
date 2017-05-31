#ifndef ANALYSEKEYWORD_H
#define ANALYSEKEYWORD_H

#include <vector>
#include <string>

class AnalyseKeyWord {
public:
    AnalyseKeyWord(std::string const &pathDico, std::size_t maxKeyWords);

    virtual void getKeyWords(std::string const &path, std::vector<std::string> &best_keyword) = 0;

protected:
    std::vector<std::string> mDico;
    std::size_t mMaxKeyWords;
};

class AnalyseKeyWordByNumber : public AnalyseKeyWord {
public:
    AnalyseKeyWordByNumber(std::string const &pathDico, std::size_t maxKeyWords);

    void getKeyWords(std::string const &path, std::vector<std::string> &best_keyword);

private:
};

#endif // ANALYSEKEYWORD_H
