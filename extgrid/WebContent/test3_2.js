
Ext.define('User',{
	extend:'Ext.data.Model',
	fields:['name', 'email', 'phone']
});
function creatwind(){
	if(Ext.getCmp('open1')){alert('已创建')}else{alert('未创建')} ;
	return a=Ext.getCmp('open1')?a:Ext.create('Ext.window.Window',{
		id:'open1',
	    title: '个人信息',
	    height: 400,
	    width: 600,
	    layout: 'fit',
	    getGrid:function(){return 'mypanel'},
	    items: [{
	    	xtype:'grid',
	    	id:'mypanel',
	    	//store: Ext.data.StoreManager.lookup('simpsonsStore'),
	    	store:Ext.create('Ext.data.Store',{
	    		model:'User',
	    		data:[
					{ name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1228' },
					{ name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
					{ name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
					{ name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
	    		  ]
	    	}),
		    columns: [
		        {header: '姓    名', dataIndex: 'name'},
		        {header: '邮    箱', dataIndex: 'email', flex:1,
		            editor: {
		                xtype: 'textfield',
		                allowBlank: false
		            }
		        },
		        {header: '联系电话', dataIndex: 'phone', editor: 'textfield'}
		    ],
		    selModel: 'cellmodel',
		    plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 1
		    },
		    height: 400,
		    width: 600,
	        listeners: {
	           //cellclick:{fn:function(abc,td, cellIndex, record, tr, rowIndex, e, eOpts){alert("aaaa"+cellIndex)}},
	           celldblclick:{fn:function(ths,td, cellIndex, record, tr, rowIndex, e, eOpts){
	        	   		alert("bbb"+cellIndex);
	        	   		alert(record.data.email);
	        	   		record.set('name','八戒');
	        	   		record.set('email','xyz@abc.com');
	        	   		record.set('phone','911-911-911');		        	   		
	        	   }
	           }
	        }
	    }],
	    closeAction:'destroy'
	});
}
function creatwind2(){
	return a=Ext.getCmp('open2')?a:Ext.create('Ext.window.Window',{
		id:'open2',
	    title: '用户信息',
	    height: 400,
	    width: 600,
	    layout: 'fit',
	    getGrid:function(){return 'mypanel2'},
	    items: [{
	    	xtype:'grid',
	    	id:'mypanel2',
	    	store: Ext.create('Ext.data.Store',{
	    		model:'User',
	    		data:[
					{ name: '关羽', email: 'guanyu@simpsons.com', phone: '555-111-1228' },
					{ name: '张飞', email: 'zhangfei@simpsons.com', phone: '555-222-1234' },
					{ name: '赵云', email: 'zhaoyun@simpsons.com', phone: '555-222-1244' },
					{ name: '刘备', email: 'liubei@simpsons.com', phone: '555-222-1254' }
	    		  ]
	    	}),
		    columns: [
		        {header: '姓    名', dataIndex: 'name'},
		        {header: '邮    箱', dataIndex: 'email', flex:1,
		            editor: {
		                xtype: 'textfield',
		                allowBlank: false
		            }
		        },
		        {header: '联系电话', dataIndex: 'phone', editor: 'textfield'}
		    ],
		    selModel: 'cellmodel',
		    plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 1
		    },
		    height: 400,
		    width: 600,
	        listeners: {
	           celldblclick:{fn:function(ths,td, cellIndex, record, tr, rowIndex, e, eOpts){
	        	   		alert("bbb"+cellIndex);
	        	   		alert(record.data.email);
	        	   		record.set('name','八戒');
	        	   		record.set('email','xyz@abc.com');
	        	   		record.set('phone','911-911-911');
	        	   }
	           }
	        }
	    }],
	    closeAction:'destroy'
	});
}

Ext.onReady(function(){
	//两个菜单按钮，用来操作窗口数据
	var bt=Ext.get("apendline");
	var bt2=Ext.get("replace");
	//每一个菜单注册一个点击事件，用来激发菜单操作响应
	bt.on("click",function(){
		var awind=Ext.WindowManager.getActive();
		//var dg=Ext.getCmp("mydatagrid");
		var dg=Ext.getCmp(awind.getGrid());
		var st=dg.getStore();
		st.add([{name: '刘备', email: 'liubei@163.com', phone: '888-111-1224'}]);
	});
	bt2.on("click",function(){
		var awind=Ext.WindowManager.getActive();
		var dg=Ext.getCmp(awind.getGrid());
		var st=dg.getStore();
		st.loadData([
	       	        { name: '刘备', email: 'liubei@163.com', phone: '888-111-1224' },
	    	        { name: '关羽', email: 'guanyu@163.com', phone: '888-222-1234' },
	    	        { name: '张飞', email: 'zhangfei@163..com', phone: '888-222-1244' },
	    	        { name: '赵云', email: 'zhaoyun@163.com', phone: '888-222-1254' }
	    	    ],false);
	});
	//两个菜单按钮，打开不同窗口，点击时将创建新窗口并打开
	var open1=Ext.get("openwindow1");
	var open2=Ext.get("openwindow2");
	open1.on('click',function(){
		var w1=creatwind();
		w1.show();
	});
	open2.on('click',function(){
		var w2=creatwind2();
		w2.show();
	});
});
