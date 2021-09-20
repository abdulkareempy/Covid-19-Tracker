export const sortData = (data,caseType="new") => {
    let sortedData = [...data];

    if(caseType==="country"){
        sortedData.sort((a, b) => a.country<b.country ? -1 : 1);
    }
    else if(caseType==="new"){
        sortedData.sort((a, b) => a.cases.new>b.cases.new ? -1 : 1);
    }
    else if(caseType==="active"){
        sortedData.sort((a, b) => a.cases.active>b.cases.active ? -1 : 1);
    }
    else if(caseType==="deaths"){
        sortedData.sort((a, b) => a.deaths.total>b.deaths.total ? -1 : 1);
    }
    else if(caseType==="recovered"){
        sortedData.sort((a, b) => a.cases.recovered>b.cases.recovered ? -1 : 1);
    }
    return sortedData;
  };