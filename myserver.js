
const URL_API = "http://www.serverconcepcion.duckdns.org:3007"

Deno.serve(async (req) => {
    console.log("Method:", req.method);

    const url = new URL(req.url);
    const temp_url = URL_API + url.pathname + url.search;

    if (req.method == 'GET') {

        console.log(temp_url)

        const jsonResponse = await fetch(temp_url);
        const jsonData = await jsonResponse.json();
        const body = JSON.stringify(jsonData);
        return new Response(body, {
            status: 404,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    } else if (req.method === "POST" && req.body !== "") {
        if (req.body) {
            const body = await req.json();
            console.log("Body:", body);

            const jsonResponse = await fetch(temp_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }
            );

            return jsonResponse;

        }
    }

    return new Response({ 'msg': 'No data' }, {
        status: 400,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    })

    /*
        console.log("Path:", url.pathname);
        console.log("Query parameters:", url.searchParams);
    
        console.log("Headers:", req.headers);
    
        if (req.body) {
            const body = await req.text();
            console.log("Body:", body);
        }
    */
});