import * as XLSX from 'xlsx';


/**
 * 엑셀 다운로드 공통 함수
 *    ex )  this.$excelDown("파일명","./deviceList", options, params);
 */
  export default {
    install (Vue) {
        

        Vue.config.globalProperties.$excelDown = function(fileName, url, options, params){
            this.$axios.post(url, params,{     
            }).then((res) => { 
                 
            // data row별 header에 바인딩 될 매핑값 설정 
            let headProps = [] 
            if (Array.isArray(options.headProps)) { 
                headProps = options.headProps 
            } else if (options.headProps === 'header') { 
                for (let h of this.headerList) { 
                headProps.push(h) 
                } 
            } else { 
                headProps = Object.keys(res.data.list[0]) 
            } 
            this.visibleHeadProps = headProps 
            
            this.instance = document.createElement('table') 
            
            // Header 세팅 
            let header = [] 
            if (!Array.isArray(this.headerList[0])) { 
                header.push(this.headerList) 
            } else { 
                header = this.headerList 
                
            } 

            let thead = document.createElement('thead') 
            for (let row of header) { 
                let tr = document.createElement('tr') 
                for (let h of row) { 
                let rowspan = h.rowspan || '1' 
                let colspan = h.colspan || '1' 
                let th = document.createElement('th') 
                th.setAttribute('rowspan', rowspan) 
                th.setAttribute('colspan', colspan) 
                th.innerText = h
                tr.appendChild(th) 
                } 
                thead.appendChild(tr) 
            } 
            this.instance.appendChild(thead)

                let tbody = document.createElement('tbody') 

                for (let row of res.data.list) { 
                  let tr = document.createElement('tr') 
                  for (let cellkey of this.itemKeyList) { 
                    let td = document.createElement('td') 
                    td.innerText = row[cellkey] 
                    tr.appendChild(td) 
                  } 
                  tbody.appendChild(tr) 
                } 
                this.instance.appendChild(tbody) 
                 
                // instance에 만들어진 table을 엑셀파일로 저장 
                let config = { raw: true, type: 'string' } 
                let ws = XLSX.utils.table_to_sheet(this.instance, config) 
                let wb = XLSX.utils.book_new() 
          
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1') 
                XLSX.writeFile(wb,  fileName + '.xlsx') 

            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    this.$swal('','네트워크가 원활하지 않습니다.<br>잠시 후 다시 시도해주세요.')
                }
            })


        }
    }
 }
