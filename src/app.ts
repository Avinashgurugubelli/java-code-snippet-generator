import { JavaPojoMapperSkeletonGenerator } from './utils/java-pojo-mapper-skleton-gen';
import { json } from 'stream/consumers';
import { JavaPojoGenerator } from './utils/java-pojo-gen';
import { JSONUtil } from './utils/json-util';
import { FileUtil } from './utils/file-util';

function generate() {
    const input: string[] = ["RECORD_TYPE", "X_ASSET_CON_TYP_CD", "X_BORROWER_CRDT_TYP", "X_ASSET_NBR", "X_PRDCT_CD", "PRFX_NM", "FRST_NM", "MDL_NM", "LST_NM", "SFX_NM", "BRTH_DT", "X_OFAC_FLG", "X_PARTY_GUID", "MRTL_STS", "X_LANG_CD", "X_ASSET_CON_STS_CD", "BORROWER_ROWID", "X_ACCEPTABLE_FLG", "ADDR_LN_1", "ADDR_LN_2", "ADDR_LN_3", "CITY", "STATE", "CNTRY_CD", "PSTL_CD", "PSTL_CD_EXT", "ADDR_TYP", "PHN_TYP", "USG_TYP", "PHN_NUM", "PHN_NUM_EXT", "DNC_IND", "X_SDNC_IND", "X_FDNC_IND", "X_PRIMARY_IND", "X_CONSENT_TYP_CD_PHONE", "X_CONSENT_PROV_CD_PHONE", "X_OTHER_CONSENT_PTY_NM_PHONE", "X_CONSENT_DTTM_PHONE", "X_SMS_BLOCKED_FLG", "X_DIALER_BLOCKED", "ETRNC_ADDR_TYP", "USG_TYP_1", "ETRNC_ADDR", "STS_CD", "X_PRIMARY_IND_1", "X_CONSENT_TYP_CD_EMAIL", "X_CONSENT_PROV_CD_EMAIL", "X_OTHER_CONSENT_PTY_NM_EMAIL", "X_CONSENT_DTTM_EMAIL", "X_NAFFLTD_FLG", "X_AFLM_FLG", "X_AFLS_FLG", "X_TMK_FLG", "X_CREDIT_APP_FLG", "X_DLR_FLG"];
    JavaPojoGenerator.generateFromArray(input);
}

// generate();

function getKeys() {
    const input = {
        "addrTyp": "string",
        "addrLn1": "string",
        "addrLn2": "string",
        "addrLn3": "string",
        "addrLn4": "string",
        "addrLn5": "string",
        "city": "string",
        "county": "string",
        "latitude": "string",
        "longitude": "string",
        "pstlCd": "string",
        "pstlCdExtn": "string",
        "stateCd": "string",
        "cntryCd": "string",
        "mailabiltyDesc": "string",
        "mailabiltyScore": "string",
        "createdBy": "string",
        "createdDt": "string",
        "updatedBy": "string",
        "updatedDt": "string",
        "lastUpdatedSys": "string"
    };

    console.log(JSON.stringify(JSONUtil.getJsonKeysInCamelCase(input)));
}

// getKeys();

async function generateMapStructSkeleton() {
    try {
        const filePath = 'src\\data\\input.json';
        const OutputFilePath = 'src\\data\\output.txt';
        const input = await FileUtil.readPromise(filePath);
        const output = JavaPojoMapperSkeletonGenerator.generateFromJson(JSON.parse(input));
        await FileUtil.writePromise(OutputFilePath, output, false);
        console.log(`output written to ${OutputFilePath}`);
    }
    catch (ex) {
        console.log(ex)
    }
}

generateMapStructSkeleton();