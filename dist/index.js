"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const cheerio_1 = __importDefault(require("cheerio"));
const connection_1 = __importDefault(require("./connection"));
const User_1 = __importDefault(require("./schemas/User"));
function solve(ApplicationNumber, day, month, year) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = qs_1.default.stringify({
            "_csrf-frontend": "VVzG3z3oE7WAqu8GZdl0ZivR5MT7MVYPr-63vQLJn3gMLqCIdp5Hhd-aum4knyApY6Dctq1DB3vO24LcTJ39Lw==",
            "Scorecardmodel[ApplicationNumber]": ApplicationNumber,
            "Scorecardmodel[Day]": day,
            "Scorecardmodel[Month]": month,
            "Scorecardmodel[Year]": year,
        });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://neet.ntaonline.in/frontend/web/scorecard/index",
            headers: {
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Accept-Language": "en-IN,en-US;q=0.9,en;q=0.8",
                "Cache-Control": "max-age=0",
                Connection: "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: "advanced-frontend=99fsip51g9l0ag3bdk3vst8e8s; _csrf-frontend=2cdd0561b851cba0fc52c7fe8f19c787943b8d390f325cd65859d3f2390b3a7aa%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22YrfWKvT0_0UhAFTOHq8rVrQta55aNTbW%22%3B%7D",
                Origin: "null",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
                "sec-ch-ua": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": '"Android"',
            },
            data: data,
        };
        try {
            const response = yield (0, axios_1.default)(config);
            const parseData = parseHtml(JSON.stringify(response.data));
            return parseData;
        }
        catch (e) {
            console.log("error in fetching data" + ApplicationNumber);
        }
    });
}
function parseHtml(htmlContent) {
    const $ = cheerio_1.default.load(htmlContent);
    const applicationNumber = $('td:contains("Application No.")').next("td").text().trim() || "N/A";
    const candidateName = $('td:contains("Candidate’s Name")').next().text().trim() || "N/A";
    const allIndiaRank = $('td:contains("NEET All India Rank")').next("td").text().trim() || "N/A";
    const marks = $('td:contains("Total Marks Obtained (out of 720)")')
        .first()
        .next("td")
        .text()
        .trim() || "N/A";
    if (allIndiaRank === "N/A") {
        return null;
    }
    return {
        applicationNumber,
        candidateName,
        allIndiaRank,
        marks,
    };
}
//iterate overl all years from 2004 to 2007
function main(rollNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let sovled = false;
        for (let year = 2004; year <= 2007; year++) {
            if (sovled) {
                break;
            }
            for (let month = 1; month <= 12; month++) {
                if (sovled) {
                    break;
                }
                const Requests = [];
                console.log("roll number: " +
                    rollNumber +
                    " for year: " +
                    year +
                    " and month: " +
                    month);
                for (let day = 1; day <= 31; day++) {
                    if (sovled) {
                        break;
                    }
                    Requests.push(solve(rollNumber, day.toString(), month.toString(), year.toString()));
                }
                const resolvedData = yield Promise.all(Requests);
                resolvedData.forEach((data, key) => {
                    if (data) {
                        console.log(data);
                        sovled = true;
                        const user = new User_1.default({
                            name: data.candidateName,
                            year: year,
                            month: month,
                            day: key + 1,
                            applicationNumber: data.applicationNumber,
                            allIndiaRank: data.allIndiaRank,
                            marks: data.marks,
                        });
                    }
                });
            }
        }
    });
}
function scrapeData() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 240411179822; i <= 240411979822; i++) {
            yield main(i.toString());
        }
    });
}
(0, connection_1.default)();
scrapeData();
