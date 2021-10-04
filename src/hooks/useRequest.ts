import {useState} from "react";

interface IUseRequestResponse<ResponseData> {
    data: ResponseData | undefined;
    loading: boolean;
    requestError: string | null;
    requestWrapper: (request: () => Promise<ResponseData>, successCallback?: Function) => void;
}

export const useRequest = <ResponseData>(): IUseRequestResponse<ResponseData> => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ResponseData | undefined>(undefined)
    const [error, setError] = useState("")

    const requestWrapper = (request: () => Promise<ResponseData>, successCallback?: Function): Promise<any> => {
        setLoading(true)
        return request()
            .then(response => {
                setData(response)
                if (successCallback) successCallback()
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    return {
        data,
        loading,
        requestError: error,
        requestWrapper
    }
}
