<template>
  <v-app style="height:100vh">
    <v-navigation-drawer app>
    <!-- -->
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <template v-slot:prepend>
        <v-avatar color="white" class="ml-4 pa-1">
          <v-img
            :aspect-ratio="1"
            src="icon-orig.png"
          ></v-img>
           
        </v-avatar>
        
      </template>
      <v-app-bar-title>TITLE</v-app-bar-title>

      <template v-slot:append>
        <v-btn
          icon
          class="mr-4"
          @click="updateInfo"
        >
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </template>
    <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid class="bg-background">
        <webview v-show="false" ref="webview" src="https://www.google.com" nodeintegration></webview>
        <v-row>
          <v-col md="4">
            
            <v-card
              class="mb-2"
              v-for="(printer, index) in printers.arr"
              :key="index"
            >
              <v-badge
                v-show="printer.isDefault"
                color="success"
                content="Default"
                inline
                style="position:absolute;right:1em;top:1em"
              ></v-badge>
              <v-card-text>
                <div>Status {{printer.status}}</div>
                <p class="text-h5 text--primary">
                  {{printer.displayName}}
                </p>
                <!-- <p>adjective</p> -->
                <div class="text--primary">
                  {{printer.description}}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  variant="text"
                  color="teal-accent-4"
                  @click="print(printer.name)"
                >
                  Connect
                </v-btn>
              </v-card-actions>

            
            </v-card>
          </v-col>
          <v-col md="8">
            <v-row>
               
            </v-row>
            <v-row class="mt-8">
              <v-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Path
                      </th>
                      <!-- <th class="text-left">
                        Timestamp
                      </th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in serialports.arr"
                      :key="index"
                    >
                      <td>{{ item.path }}</td>
                      <!-- <td>{{ item.timestamp.toLocaleString() }}</td> -->
                    </tr>
                  </tbody>
                </template>
              </v-table>
            </v-row>
          </v-col>
        </v-row>

        <!-- If using vue-router -->
        
      </v-container>
      <v-footer color="primary"  height="2em" style="position:sticky;bottom:0">
        <!-- -->powered by 🐯
      </v-footer>
    </v-main>

    
    <!-- <hello></hello> -->
 
    
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Hello from './components/Hello.vue'
import { ipcRenderer } from './electron'

export default defineComponent({
  name: 'app',
  components: {
    Hello,
  },
  setup() {
    const printers = reactive({ arr:[                     //M20 tiger: change reactive([]) to reactive({ arr:[] }), use as Alerts
        { 
          uuid: 1,
          conent:
            "1. 本申請只適用於進出入烏來鄉桶后林道，進入山地特定管制區請另外向烏玉入本申請只適用於進出入烏來鄉桶后林道，進入山地特定管制區請另外向烏玉入本申請只適用於進出入烏來鄉桶后林道，進入山地特定管制區請另外向烏玉入本申請只適用於進出入烏來鄉桶后林道，進入山地特定管制區請另外向烏玉入山檢查所現場辦理入山手續。",
          createDate: "(2021/4/27 3:07:38 AM)",
        },
        {
          name: "2.[緊急封閉]2010/02/19 ~ 2010/02/26 豪大雨道路中斷",
          time: "(2021/4/27 3:07:38 AM)",
        },
        {
          name:
            "3. 本申請只適用於進出入烏來鄉桶后林道，進入山地特定管制區請另外向烏玉入山檢查所現場辦理入山手續。",
          time: "(2021/4/27 3:07:38 AM)",
        },
    ]});

    const jobs = reactive({ arr:[                     //M20 tiger: change reactive([]) to reactive({ arr:[] }), use as Alerts
      // { data: null, timestamp: new Date() }
    ]});
    const serialports = reactive({ arr: [] });





    //send msg to electron main process from Vue
    ipcRenderer.send('message', 'Hello from App.vue!');


    //use exposed library from electron main process
    window.serialport.serialport.then((ports: Array<Object>) => {
      serialports.arr = ports
      ports.forEach(function(port: Object){
        console.log("Port: ", port);
      })
    })


    //call electron main process function
    ipcRenderer.send("getPrinterList");
    //register listener function to be called from electron main process
    ipcRenderer.on("getPrinterList", (event, data) => {
      console.log("Printer", data);
      printers.arr = data
    });
    

    //main process debug console
    ipcRenderer.on("consoleInVue", (event, data) => {
      console.log(data);
    });


    const updateInfo = () => {
      ipcRenderer.send("getPrinterList");

      window.serialport.serialport.then((ports: Array<Object>) => {
        serialports.arr = ports
        ports.forEach(function(port: Object){
          console.log("Port: ", port);
        })
      })

    }

    const print = (withDeviceName:String ) => { 
      const webview = document.querySelector('webview')
      webview.print({silent: false, printBackground: false, deviceName: withDeviceName}).then((result: Boolean)=>{
        console.log(result)
      })

      

    }
     

    return {
      printers, jobs, serialports, 
      updateInfo, print
    };

  },
})
</script>
