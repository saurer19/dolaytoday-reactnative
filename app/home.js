/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
Text,View,
  ScrollView,AsyncStorage
} from 'react-native';
import { Card,Button,List,ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
 constructor(props) {
    super(props);
    this.state = {
      loaded: false ,
      data:null,
      list:[]
    };
  }
 
  componentDidMount(){
    AsyncStorage.getItem('dolar', (error, result) => {
        if (result) {
            let l =JSON.parse(result)
            this.setState({
                list:l
            });
        }
    });
    this.Update();
}
  Update(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://s3.amazonaws.com/dolartoday/data.json',true);
    request.onload = () => {
      if (request.status === 200){
        let req =JSON.parse(request.responseText)
        let obj={dolar: req.USD.transferencia,time: req._timestamp.fecha}  
        let l = this.state.list;
        if(l.length== 0){
            l.unshift(obj);  
        } 
        if(obj.time!=l[0].time){
            l.unshift(obj);
            if (l.length>6){
                l.pop(); 
            }
        }        
        this.setState({
            loaded: true,
            data:obj,
            list:l
        });
        AsyncStorage.setItem('dolar', JSON.stringify(l));
        console.log(this.state.data.USD);
        
      } else {
            console.warn('error');
        }
    };
    request.send();
  }
  render() {
      return (
      <View style={{flex:1}}>
        <View style={{flex:3}}> 
          <Card title='DOLAR'> 
              {this.state.loaded ? (
                    <Text style={{marginTop: 10,textAlign:'center', fontSize:22,fontWeight: 'bold',}}>
                        {this.state.data.dolar} Bs/$
                    </Text>
                    
                ) : (
                    <Text style={{marginTop: 10,marginBottom: 20,textAlign:'center', fontSize:22,fontWeight: 'bold',}}>
                        Cargando...
                    </Text>
                )} 
                {this.state.loaded &&
                <Text style={{margin: 10,textAlign:'center'}}>
                    {this.state.data.time}
                    </Text>
                }
                <Button onPress={()=>this.Update()}
                    icon={{name: 'refresh'}}
                    title='Refresh'
                    backgroundColor="#00974A" />
            
          </Card>
        </View>
        <View style={{flex:4}}> 
            <ScrollView style={{flex:4,marginTop:20}}>
              <List>
                  {
                    this.state.list.slice(0, 7).map((l, i) => (
                      <ListItem
                        roundAvatar
                        hideChevron={true}
                        key={i}
                        leftIcon={{name:'attach-money'}}
                        title={l.dolar+" Bs/$"}
                        subtitle={l.time}
                      />
                    ))
                  }
              </List>
            </ScrollView>
        </View>
        <View style={{flex:1,marginTop:10}}>
        
               
              <Button
              onPress={()=>Actions.calculator({dolar:this.state.data.dolar})}
              icon={{name: 'cached'}}
              title='Calulator'
              backgroundColor="#00974A" />
              
          </View>
        </View>
      );
    
  }
  renderLoadingView(){
    return(
        <View >
          <Text style={{marginTop: 180,textAlign: 'center'}}>Cargando...</Text>
        </View>
      );
  }
}

