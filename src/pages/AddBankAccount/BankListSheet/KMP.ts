function KMP(origin: string, keyword: string) {
    const oDump = origin.split('');
    const kDump = keyword.split('');
    const oLength = oDump.length;
    const kLength = kDump.length;

    const failure: number[] = [];
    failure.length = kDump.length;
    failure.fill(-1);

    for (let i = 1; i < kLength; i++) {
        const idx = 1 + failure[i - 1];
        if (kDump[i] == kDump[idx]) {
            failure[i] = idx;
        } else {
            failure[i] = -1;
        }
    }

    let n = 0,
        m = 0;
    while (m < kLength && n < oLength) {
        if (oDump[n] === kDump[m]) {
            n++;
            m++;
        } else if (m === 0) {
            n++;
        } else {
            m = 1 + failure[m - 1];
        }
    }

    return m === kLength ? n - kLength : -1;
}

export default KMP;
