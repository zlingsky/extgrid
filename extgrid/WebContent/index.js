
function open(){
	Ext.onReady(function(){
		var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		var win = Ext.create('widget.window', {
			title: 'Layout Window with title <em>after</em> tools',
			header: {
				titlePosition: 2,
				titleAlign: 'left'
			},
			closable: true,
			closeAction: 'hide',
			width: 300,
			height: 400,
			fieldDefaults: {
				msgTarget: 'side',
				labelWidth: 150
			},
			defaultType: 'textfield',
			layout: {
				type: 'border',
				padding: 5
			},
			items: [{
				fieldLabel: 'First Name',
				afterLabelTextTpl: required,
				name: 'first',
				allowBlank: false
			}]
       }).show();
	});
}



/**
 * 物科主文件设定
 * @returns
 */
function wkzwjsd(){
	Ext.onReady(function() {
		Ext.create("Ext.window.Window",{
			title: '单据',
            width: 700,
            height:450,
            anchor:'100%',
            listeners:{
				//容器右键事件
				 contextmenu:function(grid, e, eOpts){
					alert();
				}
    		},
            items : [{
            	xtype:'panel',
            	layout:'column',
            	defaultType: 'textfield',
            	baseCls: 'x-plain',
	         	anchor:'100%',
	         	items: [{
	             	fieldLabel: '单据日期',
			        xtype: 'datefield',
	             	name: 'cgqglx',
	             	value: new Date()
	         	},{
	             	fieldLabel: '单据号码',
	             	name: 'djrq',
	             	value: ''
	             	
	         	},{
	             	fieldLabel: '增值科目',
	             	name: 'zzkm',
	             	value: ''
	             	
	         	},{
	             	fieldLabel: '凭证编号',
	             	name: 'pzdh',
	             	value: ''
	             	
	         	},{
	             	fieldLabel: '减值科目',
	             	name: 'jzkm',
	             	value: ''
	             	
	         	},{
	             	fieldLabel: '调整方式',
			xtype:'combo',
	             	name: 'tzfs',
	             	displayField: 'name',
    				valueField: 'abbr',
					store: Ext.create('Ext.data.Store', {
						fields: ['abbr', 'name'],
    					data : [
        					{"abbr":"调单价", "name":"调单价"},
        					{"abbr":"调金额", "name":"调金额"}
					   ]
					}),
					value: '调单价',
        			typeAhead: true,
        			mode: 'local',
        			triggerAction: 'all',
        			selectOnFocus:true,
        			margin: '5 25'
	         	}]
            },{
            	xtype: 'tabpanel',
            	baseCls: 'x-plain',
            	layout: 'fit',
            	width: '100%',
            	height: 235,
                autoScroll: false,
                items: [{
                    rtl: false,
                    title: '内容',
                    id: 'wkzwjsb-grid',
                    xtype:'grid',
                    layout: 'fit',
                    baseCls: 'x-plain',
					style:{'top': '25px'},
					autoScroll: true,
					stripeRows:true,
					trackMouseOver:true,
					bodyStyle: "margin-top:20px",
					plugins: [
        				Ext.create('Ext.grid.plugin.CellEditing', {
            				clicksToEdit: 1
        				})
    				],
    				listeners:{
    					//容器右键事件
    					containercontextmenu:function(grid, e, eOpts){
    						e.preventDefault();
    						new Ext.menu.Menu({
    							items:[{
    								xtype: '',
    								text: '保存方案',
    								pressed: false,
    								handler: function(){}
    							},{
    								xtype: '',
    								text: '清除方案',
    								pressed: false,
    								handler: function(){}
    							},{
    								xtype: '',
    								text: '选择方案',
    								pressed: false,
    								menu:new Ext.menu.Menu({
    									items:[{
    										text:'预设方案',
    										pressed: false
    									}]
    								}),
    								handler: function(){}
    							},{
    								xtype: '',
    								text: '导出至Excel',
    								pressed: false,
    								handler: function(){}
    							},{
    								xtype: '',
    								text: '网格打印',
    								pressed: false,
    								handler: function(){}
    							}]
    						}
    						
    						).showAt(e.getXY());
    					
    					},
    					
    					//容器双击事件
    					containerdblclick: function(grid, e, eOpts){
    					
    						if(!grid.getStore().count(false)){
	    						grid.getStore().add({'wlmc':'1', 'xqrq':' - - ','dw':'喊'});
    						}
    						
//	console.info(grid);
//	console.info(e);
//	console.info(eOpts);
	
    					},
    					
    					//双击数据行事件
    					celldblclick: function(){
    						//alert();
    					}
    					
    				},
			
				columns: [
				 {header: '（栏号）',
	                    		xtype: 'rownumberer',
	                    		dataIndex: 'lh', 
	                    		width: 50,
								sortable: false,
            					xhooks: {
                					renderer: function(v, meta, record) {
                    					meta.tdAttr = 'style="vertical-align:center;height:' + record.data.rowHeight + 'px"';
                    					return this.callParent(arguments);
                					}
            					}
        					},
                    		{ header: '<span style="color: green">物料编号</span>', dataIndex: 'wlbh', width:150, editor: { xtype: 'textfield'} },
                    		{ header: '（物料名称）', dataIndex: 'wlmc'},
                    		{ header: '（规格型号）', dataIndex: 'ggxh'},
                    		{ header: '（单位）', dataIndex: 'dw'},
                    		{ header: '（库存量）', dataIndex: 'ckl', editor: { xtype: 'numberfield'} },
				{ header: '（平均成本）', dataIndex: 'pjcb', width:70, groupable: false }, 
				{ header: '单价', dataIndex: 'dj', width: 70, groupable: false }, 
				{ header: '（调价金额）', dataIndex: 'tjje', width: 70, groupable: false },
				{ header: '分录备注', dataIndex: 'flbz', width:150, editor: { xtype: 'textfield'} }
				
			      ]},
        		
				      	
				       
			     {
                    title: '备注',
                    xtype:'panel',
	            	baseCls: 'x-plain',
		         	anchor: '100%',
		         	bodyStyle: "margin-top:25px",
		         	items: [{
		         		fieldLabel: '备注',
		         		labelWidth: 50,
		         		baseCls: 'x-plain',
             			xtype: 'textarea',
             			name: 'bz',
             			style:{'top': '25px'},
             			width: 570,
             			height: 160
             		}]
                }]
            },{
            	xtype:'panel',
            	layout:'column',
            	defaultType: 'textfield',
            	baseCls: 'x-plain',
	         	anchor:'100%',
	         	items: [{
	             	fieldLabel: '制单人员',
	             	name: 'zdry',
	             	value: 'Admin',
	             	margin: '5 25'
	         	},{
	             	fieldLabel: '复核人员',
	             	name: 'fhry',
	             	margin: '5 25'
	         	}]
            },]
		}).show();
	});
}









/**
 * 仓库设定
 */
function cksd(){
	Ext.require([
	     'Ext.form.*',
	     'Ext.window.Window'
	 ]);
	
	 Ext.onReady(function() {
	     var field = new Ext.form.field.Text({renderTo: document.body }), 
	     	 fieldHeight = field.getHeight(),
	         padding = 5;
	     
	     field.destroy();
	     
	     var form = new Ext.form.Panel({
	         border: false,
	         fieldDefaults: {
	             labelWidth: 75
	         },
	         defaultType: 'textfield',
	         bodyPadding: padding,
	         anchor:'100%',
	
	         items: [{
	             fieldLabel: '仓库编号',
	             name: 'ckbh',
	             value: '01'
	         },{
	             fieldLabel: '仓库名称',
	             name: 'ckmc',
	             value: '原料仓库'
	         },{
	             fieldLabel: '仓库简称',
	             name: 'ckjc',
	             value: '原料仓库'
	         },{
	             fieldLabel: '英文名称',
	             name: 'ywmc'
	         },{
	             fieldLabel: '联系人员',
	             name: 'lxry',
	             value: '王保管'
	         },{
	             fieldLabel: '联系电话',
	             name: 'lxdh'
	         },{
	             fieldLabel: '仓库地址',
	             name: 'ckdz'
	         },
	         {
	        	 fieldLabel: '备注',
	             xtype: 'textarea',
	             name: 'bz'
	         }]
	     });
	
	     new Ext.window.Window({
	         autoShow: true,
	         title: '仓库设定',
	         width: 260,
	         height:300,
	         resizable: false,
	         layout: 'fit',
	         plain: true,
	         items: form
	     });
	 });
}