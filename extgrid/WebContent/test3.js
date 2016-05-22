
Ext.onReady(function(){
	//两个菜单按钮，用来操作窗口数据
	var bt=Ext.get("apendline");
	var bt2=Ext.get("replace");
	//每一个菜单注册一个点击事件，用来激发菜单操作响应
	bt.on("click",function(){
		var dg=Ext.getCmp("mydatagrid");
		var st=dg.getStore();
		st.add([{name: '刘备', email: 'liubei@163.com', phone: '888-111-1224'}]);
	});
	bt2.on("click",function(){
		var dg=Ext.getCmp("mydatagrid");
		var st=dg.getStore();
		st.loadData([
	       	        { name: '刘备', email: 'liubei@163.com', phone: '888-111-1224' },
	    	        { name: '关羽', email: 'guanyu@163.com', phone: '888-222-1234' },
	    	        { name: '张飞', email: 'zhangfei@163..com', phone: '888-222-1244' },
	    	        { name: '赵云', email: 'zhaoyun@163.com', phone: '888-222-1254' }
	    	    ],false);
	});
	//两个不同窗口创建代码，点击时将创建新窗口并打开
	var open1=Ext.get("openwindow1");
	var open2=Ext.get("openwindow2");
	open1.on('click',function(){
		creatwind().show();
	});
	open2.on('click',function(){
		creatwind2().show();
	});
	//创建窗口打开时初始数据，新窗口被创建并打开时加载这些数据
	Ext.create('Ext.data.Store', {
	    storeId: 'simpsonsStore',
	    fields:[ 'name', 'email', 'phone'],
	    data: [
	        { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
	        { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
	        { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
	        { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
	    ]
	});
    //创建一个datagrid组件
	var ddgrid=Ext.create('Ext.grid.Panel', {
	    //title: 'Simpsons',
	    id:"mydatagrid",
	    store: Ext.data.StoreManager.lookup('simpsonsStore'),
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
        	   		var dg=Ext.getCmp("mydatagrid");
        	   		var stm=dg.getSelectionModel( );
        	   		var rec=stm.getSelection( );
        	   		
        	   }
           }
        }
	});
//	Ext.create('Ext.window.Window', {
//	    title: 'Hello',
//	    height: 400,
//	    width: 600,
//	    layout: 'fit',
//	    items: [ddgrid]
//	}).show();
	//窗口1创建函数，返回一个新窗口对象并加载数据到窗口的datagrid组件中，显示
	function creatwind(){
		if(Ext.getCmp('open1')){alert('已创建')}else{alert('未创建')} ;
		return a=Ext.getCmp('open1')?a:Ext.create('Ext.window.Window',{
			id:'open1',
		    title: '个人信息',
		    height: 400,
		    width: 600,
		    layout: 'fit',
		    items: [{
		    	xtype:'grid',
		    	id:'mypanel',
		    	store: Ext.data.StoreManager.lookup('simpsonsStore'),
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
		    items: [{
		    	xtype:'grid',
		    	id:'mypanel2',
		    	store: Ext.data.StoreManager.lookup('simpsonsStore'),
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
});

