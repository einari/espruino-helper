
(function () {

    exports.init = function () {
        var args = process.argv.slice(2);
        if (args.length != 2) {
            console.log("usage : espruino-helper <file to upload>.js <ip address>");
            return;
        }

        var file = __dirname + "/" + args[0];
        var device = args[1];

        require("buffer");
        var net = require("net");
        var jschardet = require('jschardet');
        var fs = require("fs");

        var client = new net.Socket();
        client.on("data", function (data) {
            if (data.length <= 1) return;
        
            //var enc = jschardet.detect(data).encoding.toLowerCase();
            var buffer = new Buffer(data.buffer, "ascii");
            var e = buffer.toString();
        
            //var o = JSON.parse(e);
            console.log(e + "\n");
        });

        console.log("Uploading file '" + file + "'");
        fs.readFile(file, function (err, data) {

            var enc = jschardet.detect(data).encoding.toLowerCase();
            var fileAsBuffer = new Buffer(data.buffer, enc);
            var file = fileAsBuffer.toString();

            client.connect(23, device, function () {
                console.log("Connected - resetting");
                client.write("\x03reset();\n");
                setTimeout(function () {
                    console.log("Uploading...");
                    var code = "echo(0);\n" + file + "\necho(1);\n";
                    client.write(code);

                    setTimeout(function () {
                        client.destroy();
                        console.log("Uploaded");
                    }, 200);
                }, 200);
            });
        });
    }
})();

