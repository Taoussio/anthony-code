
require('fs').readdir('./bk/hubspot', (err, files) => {
    if (err) {
        console.log('Unable to scan directory: ' + err);
        process.exit(0)
    }
    let a = []
    let total_siret = 0
    let total_mail = 0
    let total_tel = 0
    let total_website = 0
    let total_contry = {}
    files.forEach((file) => {
        console.log(file);
        let json = JSON.parse(require('fs').readFileSync(`./bk/hubspot/${file}`, 'utf-8'))
        json.forEach(elem => {
            if (elem.properties.siret)
                total_siret++
            if (elem.properties.e_mail)
                total_mail++
            if (elem.properties.num_ro_de_portable || elem.properties.phone || elem.properties.num_ro_de_contact_client)
                total_tel++
            if (elem.properties.url_du_site_web)
                total_website++
            total_contry[elem.properties.country] = total_contry[elem.properties.country] ? total_contry[elem.properties.country] + 1 : 1
            a.push(elem)
        })
    });
    console.log("------------")
    console.log(a.length)
    console.log({ total_siret })
    console.log({ total_mail })
    console.log({ total_tel })
    console.log({ total_website })
    console.log({ total_contry })
    require('fs').writeFileSync(`./data/hubspot.json`, JSON.stringify(a, null, 4))
})

